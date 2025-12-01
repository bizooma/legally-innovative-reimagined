import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MarketingPlan } from '@/types/marketing-plan';
import { MarketingKPI } from '@/types/marketing-kpi';

interface PdfExportOptions {
  marketingPlan: MarketingPlan;
  clientName: string;
  kpis: MarketingKPI[];
}

export const generateMarketingPlanPdf = ({ marketingPlan, clientName, kpis }: PdfExportOptions) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add page breaks
  const checkPageBreak = (requiredSpace: number = 40) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  // Helper function to add section header
  const addSectionHeader = (title: string, icon?: string) => {
    checkPageBreak(30);
    doc.setFillColor(139, 28, 28); // Dark red
    doc.rect(14, yPosition, pageWidth - 28, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title, pageWidth / 2, yPosition + 8, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    yPosition += 18;
  };

  // Cover Page
  doc.setFillColor(139, 28, 28);
  doc.rect(0, 0, pageWidth, 80, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Marketing Plan', pageWidth / 2, 35, { align: 'center' });
  doc.setFontSize(20);
  doc.text(clientName, pageWidth / 2, 55, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 95, { align: 'center' });

  // Overall Score Gauge (if we have KPIs)
  if (kpis.length > 0) {
    const avgScore = kpis.reduce((sum, kpi) => {
      const progress = kpi.target_value ? Math.min((kpi.metric_value / kpi.target_value) * 100, 100) : 0;
      return sum + progress;
    }, 0) / kpis.length;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Overall Performance', pageWidth / 2, 115, { align: 'center' });
    doc.setFontSize(36);
    doc.setTextColor(139, 28, 28);
    doc.text(`${Math.round(avgScore)}%`, pageWidth / 2, 135, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('of target goals achieved', pageWidth / 2, 145, { align: 'center' });
  }

  yPosition = 170;

  // Executive Summary
  doc.addPage();
  yPosition = 20;
  addSectionHeader('Executive Summary');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  if (marketingPlan.executive_summary.strengths) {
    doc.setFont('helvetica', 'bold');
    doc.text('What\'s Working:', 14, yPosition);
    yPosition += 7;
    doc.setFont('helvetica', 'normal');
    const strengthsText = doc.splitTextToSize(marketingPlan.executive_summary.strengths, pageWidth - 28);
    doc.text(strengthsText, 14, yPosition);
    yPosition += strengthsText.length * 6 + 10;
  }

  if (marketingPlan.executive_summary.gaps) {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.text('What Needs Attention:', 14, yPosition);
    yPosition += 7;
    doc.setFont('helvetica', 'normal');
    const gapsText = doc.splitTextToSize(marketingPlan.executive_summary.gaps, pageWidth - 28);
    doc.text(gapsText, 14, yPosition);
    yPosition += gapsText.length * 6 + 10;
  }

  // KPI Summary Table
  if (kpis.length > 0) {
    checkPageBreak(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Key Performance Indicators', 14, yPosition);
    yPosition += 10;

    const kpiTableData = kpis.map(kpi => {
      const progress = kpi.target_value ? Math.min((kpi.metric_value / kpi.target_value) * 100, 100) : 0;
      return [
        kpi.metric_name,
        kpi.metric_value.toString() + (kpi.metric_unit || ''),
        kpi.target_value ? kpi.target_value.toString() + (kpi.metric_unit || '') : 'N/A',
        `${Math.round(progress)}%`
      ];
    });

    autoTable(doc, {
      startY: yPosition,
      head: [['Metric', 'Current', 'Target', 'Progress']],
      body: kpiTableData,
      theme: 'striped',
      headStyles: { fillColor: [139, 28, 28], textColor: 255 },
      styles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;
  }

  // SWOT Analysis
  doc.addPage();
  yPosition = 20;
  addSectionHeader('SWOT Analysis');

  const swotSections = [
    { title: 'Strengths', data: marketingPlan.swot_analysis.strengths, color: [34, 139, 34] },
    { title: 'Weaknesses', data: marketingPlan.swot_analysis.weaknesses, color: [255, 140, 0] },
    { title: 'Opportunities', data: marketingPlan.swot_analysis.opportunities, color: [70, 130, 180] },
    { title: 'Threats', data: marketingPlan.swot_analysis.threats, color: [220, 20, 60] }
  ];

  swotSections.forEach((section) => {
    if (section.data && section.data.length > 0) {
      checkPageBreak(40);
      doc.setFillColor(section.color[0], section.color[1], section.color[2]);
      doc.rect(14, yPosition, pageWidth - 28, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(section.title, 16, yPosition + 5.5);
      doc.setTextColor(0, 0, 0);
      yPosition += 12;

      section.data.forEach((item) => {
        checkPageBreak(15);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const itemText = doc.splitTextToSize(`• ${item}`, pageWidth - 32);
        doc.text(itemText, 18, yPosition);
        yPosition += itemText.length * 5 + 3;
      });
      yPosition += 5;
    }
  });

  // Target Audiences
  if (marketingPlan.target_audiences && marketingPlan.target_audiences.length > 0) {
    doc.addPage();
    yPosition = 20;
    addSectionHeader('Target Audiences');

    marketingPlan.target_audiences.forEach((audience, idx) => {
      checkPageBreak(25);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${audience.name}`, 14, yPosition);
      yPosition += 7;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const descText = doc.splitTextToSize(audience.description, pageWidth - 28);
      doc.text(descText, 18, yPosition);
      yPosition += descText.length * 5 + 8;
      if (audience.brand) {
        doc.setFont('helvetica', 'italic');
        doc.text(`Brand: ${audience.brand}`, 18, yPosition);
        yPosition += 8;
      }
    });
  }

  // Marketing Objectives
  if (marketingPlan.marketing_objectives && marketingPlan.marketing_objectives.length > 0) {
    doc.addPage();
    yPosition = 20;
    addSectionHeader('Marketing Objectives');

    marketingPlan.marketing_objectives.forEach((objective, idx) => {
      checkPageBreak(20);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${objective.objective}`, 14, yPosition);
      yPosition += 7;
      if (objective.timeline || objective.target) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const details = [];
        if (objective.timeline) details.push(`Timeline: ${objective.timeline}`);
        if (objective.target) details.push(`Target: ${objective.target}`);
        doc.text(details.join(' | '), 18, yPosition);
        yPosition += 10;
      }
    });
  }

  // Budget Breakdown
  if (marketingPlan.budget && marketingPlan.budget.total) {
    doc.addPage();
    yPosition = 20;
    addSectionHeader('Budget Allocation');

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const budgetData: any[] = [];
    if (marketingPlan.budget.plg_allocation) {
      budgetData.push(['Puget Law Group', `$${marketingPlan.budget.plg_allocation.toLocaleString()}`]);
    }
    if (marketingPlan.budget.wwc_allocation) {
      budgetData.push(['Win With Casey', `$${marketingPlan.budget.wwc_allocation.toLocaleString()}`]);
    }
    budgetData.push(['Total Annual Budget', `$${marketingPlan.budget.total.toLocaleString()}`]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Category', 'Amount']],
      body: budgetData,
      theme: 'striped',
      headStyles: { fillColor: [139, 28, 28], textColor: 255 },
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;

    // Detailed breakdown if available
    if (marketingPlan.budget.breakdown) {
      checkPageBreak(50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Detailed Budget Breakdown', 14, yPosition);
      yPosition += 10;

      const breakdownData = Object.entries(marketingPlan.budget.breakdown).map(([key, value]) => [
        key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        `$${(value as number).toLocaleString()}`
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [['Category', 'Annual Amount']],
        body: breakdownData,
        theme: 'striped',
        headStyles: { fillColor: [139, 28, 28], textColor: 255 },
        styles: { fontSize: 9 },
        margin: { left: 14, right: 14 },
      });

      yPosition = (doc as any).lastAutoTable.finalY + 10;
    }
  }

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `${clientName} Marketing Plan | Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `${clientName.replace(/\s+/g, '_')}_Marketing_Plan_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
