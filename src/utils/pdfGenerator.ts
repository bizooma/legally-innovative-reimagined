import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AuditResult {
  id: string;
  audit_type: string;
  category: string;
  item_name: string;
  score: number;
  status: string;
  recommendations: string;
  positive_feedback?: string | null;
  details: any;
}

interface AccessCodeData {
  client_name: string;
  website_url: string;
  gbp_url?: string;
  executive_summary_strengths?: string | null;
  executive_summary_gaps?: string | null;
  action_plan?: any;
}

const STATUS_COLORS = {
  excellent: [76, 175, 80],
  good: [33, 150, 243],
  needs_improvement: [255, 152, 0],
  critical: [244, 67, 54],
};

const getStatusColor = (status: string): number[] => {
  return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || [158, 158, 158];
};

const drawScoreGauge = (doc: jsPDF, x: number, y: number, score: number, radius: number) => {
  const centerX = x + radius;
  const centerY = y + radius;
  
  // Draw background circle
  doc.setFillColor(240, 240, 240);
  doc.circle(centerX, centerY, radius, 'F');
  
  // Draw score arc
  const scoreAngle = (score / 100) * 180; // Semi-circle gauge
  const startAngle = 180;
  const endAngle = 180 - scoreAngle;
  
  // Determine color based on score
  let color: number[];
  if (score >= 90) color = STATUS_COLORS.excellent;
  else if (score >= 70) color = STATUS_COLORS.good;
  else if (score >= 50) color = STATUS_COLORS.needs_improvement;
  else color = STATUS_COLORS.critical;
  
  doc.setFillColor(color[0], color[1], color[2]);
  
  // Draw arc segments
  const segments = 50;
  for (let i = 0; i < segments; i++) {
    const angle1 = startAngle - (i * scoreAngle / segments);
    const angle2 = startAngle - ((i + 1) * scoreAngle / segments);
    
    const x1 = centerX + (radius - 5) * Math.cos(angle1 * Math.PI / 180);
    const y1 = centerY - (radius - 5) * Math.sin(angle1 * Math.PI / 180);
    const x2 = centerX + radius * Math.cos(angle1 * Math.PI / 180);
    const y2 = centerY - radius * Math.sin(angle1 * Math.PI / 180);
    const x3 = centerX + radius * Math.cos(angle2 * Math.PI / 180);
    const y3 = centerY - radius * Math.sin(angle2 * Math.PI / 180);
    const x4 = centerX + (radius - 5) * Math.cos(angle2 * Math.PI / 180);
    const y4 = centerY - (radius - 5) * Math.sin(angle2 * Math.PI / 180);
    
    doc.setFillColor(color[0], color[1], color[2]);
    doc.triangle(x1, y1, x2, y2, x3, y3, 'F');
    doc.triangle(x1, y1, x3, y3, x4, y4, 'F');
  }
  
  // Draw score text
  doc.setFontSize(28);
  doc.setTextColor(33, 33, 33);
  doc.text(score.toString(), centerX, centerY + 5, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Overall Score', centerX, centerY + 15, { align: 'center' });
};

export const generateAuditPDF = (
  auditResults: AuditResult[],
  accessCodeData: AccessCodeData,
  overallScore: number
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;

  // ===== COVER PAGE =====
  doc.setFillColor(79, 70, 229); // Primary color
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.text('SEO Audit Report', pageWidth / 2, 35, { align: 'center' });
  
  // Client information
  yPos = 80;
  doc.setTextColor(33, 33, 33);
  doc.setFontSize(20);
  doc.text(accessCodeData.client_name, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(accessCodeData.website_url, pageWidth / 2, yPos, { align: 'center' });
  
  if (accessCodeData.gbp_url) {
    yPos += 6;
    doc.text(`GBP: ${accessCodeData.gbp_url}`, pageWidth / 2, yPos, { align: 'center' });
  }
  
  // Overall score gauge
  yPos += 20;
  drawScoreGauge(doc, pageWidth / 2 - 30, yPos, overallScore, 30);
  
  // Date
  yPos = pageHeight - 20;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Report Generated: ${reportDate}`, pageWidth / 2, yPos, { align: 'center' });

  // ===== EXECUTIVE SUMMARY PAGE =====
  if (accessCodeData.executive_summary_strengths || accessCodeData.executive_summary_gaps) {
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(18);
    doc.setTextColor(33, 33, 33);
    doc.text('Executive Summary', 20, yPos);
    
    yPos += 15;
    
    // What's Working section
    if (accessCodeData.executive_summary_strengths) {
      doc.setFontSize(14);
      doc.setTextColor(76, 175, 80);
      doc.text('✓ What\'s Working', 20, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(33, 33, 33);
      const strengths = accessCodeData.executive_summary_strengths
        .split('\n')
        .filter(s => s.trim().length > 0)
        .map(s => s.replace(/^[•\-\*]\s*/, ''));
      
      strengths.forEach(strength => {
        const lines = doc.splitTextToSize(strength, pageWidth - 50);
        doc.text('• ' + lines[0], 25, yPos);
        yPos += 6;
        for (let i = 1; i < lines.length; i++) {
          doc.text('  ' + lines[i], 25, yPos);
          yPos += 6;
        }
        yPos += 2;
      });
      
      yPos += 10;
    }
    
    // What Needs Attention section
    if (accessCodeData.executive_summary_gaps) {
      doc.setFontSize(14);
      doc.setTextColor(255, 152, 0);
      doc.text('⚠ What Needs Attention', 20, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(33, 33, 33);
      const gaps = accessCodeData.executive_summary_gaps
        .split('\n')
        .filter(g => g.trim().length > 0)
        .map(g => g.replace(/^[•\-\*]\s*/, ''));
      
      gaps.forEach(gap => {
        const lines = doc.splitTextToSize(gap, pageWidth - 50);
        doc.text('• ' + lines[0], 25, yPos);
        yPos += 6;
        for (let i = 1; i < lines.length; i++) {
          doc.text('  ' + lines[i], 25, yPos);
          yPos += 6;
        }
        yPos += 2;
      });
    }
  }

  // ===== ACTION PLAN PAGE =====
  if (accessCodeData.action_plan) {
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(18);
    doc.setTextColor(33, 33, 33);
    doc.text('Prioritized Action Plan', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Follow this roadmap to systematically improve your SEO performance', 20, yPos);
    
    yPos += 15;
    
    const tiers = [
      { key: 'tier1', title: accessCodeData.action_plan.tier1?.title, color: [244, 67, 54] },
      { key: 'tier2', title: accessCodeData.action_plan.tier2?.title, color: [255, 152, 0] },
      { key: 'tier3', title: accessCodeData.action_plan.tier3?.title, color: [33, 150, 243] },
    ];
    
    tiers.forEach(({ key, title, color }) => {
      const tierData = accessCodeData.action_plan[key];
      if (!tierData) return;
      
      // Tier header
      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(20, yPos - 5, pageWidth - 40, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(title || tierData.title, 25, yPos + 2);
      
      yPos += 12;
      
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      const descLines = doc.splitTextToSize(tierData.description, pageWidth - 50);
      descLines.forEach((line: string) => {
        doc.text(line, 25, yPos);
        yPos += 5;
      });
      
      yPos += 5;
      
      // Actions
      tierData.actions?.forEach((action: any, index: number) => {
        if (yPos > pageHeight - 40) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(10);
        doc.setTextColor(33, 33, 33);
        doc.text(`${index + 1}. ${action.title}`, 30, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        const actionLines = doc.splitTextToSize(action.description, pageWidth - 60);
        actionLines.forEach((line: string) => {
          doc.text(line, 35, yPos);
          yPos += 5;
        });
        
        doc.setTextColor(100, 100, 100);
        doc.text(`Impact: ${action.impact} | Effort: ${action.effort}`, 35, yPos);
        yPos += 8;
      });
      
      yPos += 5;
    });
  }

  // ===== SUMMARY PAGE =====
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(18);
  doc.setTextColor(33, 33, 33);
  doc.text('Audit Scores by Category', 20, yPos);
  
  yPos += 15;
  
  // Calculate category scores
  const auditTypes = ['local_seo', 'aeo', 'voice_seo', 'gbp'];
  const categoryData = auditTypes.map(type => {
    const results = auditResults.filter(r => r.audit_type === type);
    if (results.length === 0) return null;
    
    const avgScore = Math.round(
      results.reduce((sum, r) => sum + r.score, 0) / results.length
    );
    
    const statusCounts = {
      excellent: results.filter(r => r.status === 'excellent').length,
      good: results.filter(r => r.status === 'good').length,
      needs_improvement: results.filter(r => r.status === 'needs_improvement').length,
      critical: results.filter(r => r.status === 'critical').length,
    };
    
    return {
      name: type.replace('_', ' ').toUpperCase(),
      score: avgScore,
      total: results.length,
      ...statusCounts,
    };
  }).filter(Boolean);

  // Summary table
  autoTable(doc, {
    startY: yPos,
    head: [['Audit Category', 'Score', 'Total Items', 'Excellent', 'Good', 'Needs Work', 'Critical']],
    body: categoryData.map(cat => [
      cat!.name,
      cat!.score.toString(),
      cat!.total.toString(),
      cat!.excellent.toString(),
      cat!.good.toString(),
      cat!.needs_improvement.toString(),
      cat!.critical.toString(),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 5 },
  });

  // ===== DETAILED RESULTS BY CATEGORY =====
  const addAuditSection = (auditType: string, title: string) => {
    const results = auditResults.filter(r => r.audit_type === auditType);
    if (results.length === 0) return;

    doc.addPage();
    yPos = 20;
    
    // Section header
    doc.setFillColor(79, 70, 229);
    doc.rect(0, yPos - 10, pageWidth, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text(title, 20, yPos);
    
    yPos += 15;
    
    // Category score
    const avgScore = Math.round(
      results.reduce((sum, r) => sum + r.score, 0) / results.length
    );
    
    doc.setFontSize(12);
    doc.setTextColor(33, 33, 33);
    doc.text(`Average Score: ${avgScore}/100`, 20, yPos);
    
    yPos += 10;
    
    // Results by category
    const categories = [...new Set(results.map(r => r.category))];
    
    categories.forEach(category => {
      const categoryResults = results.filter(r => r.category === category);
      
      // Check if we need a new page
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }
      
      // Category name
      doc.setFontSize(13);
      doc.setTextColor(79, 70, 229);
      doc.text(category, 20, yPos);
      yPos += 8;
      
      // Items table
      autoTable(doc, {
        startY: yPos,
        head: [['Item', 'Score', 'Status', 'Feedback']],
        body: categoryResults.map(result => {
          let feedback = '';
          if (result.positive_feedback && result.score >= 70) {
            feedback = `✓ ${result.positive_feedback}`;
          }
          if (result.recommendations) {
            if (feedback) feedback += '\n\n';
            feedback += `→ ${result.recommendations}`;
          }
          return [
            result.item_name,
            result.score.toString(),
            result.status.replace('_', ' ').toUpperCase(),
            feedback.substring(0, 200) + (feedback.length > 200 ? '...' : ''),
          ];
        }),
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229], textColor: 255 },
        styles: { fontSize: 9, cellPadding: 4 },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 35, halign: 'center' },
          3: { cellWidth: 'auto' },
        },
        didParseCell: (data) => {
          if (data.column.index === 2 && data.section === 'body') {
            const status = categoryResults[data.row.index].status;
            const color = getStatusColor(status);
            data.cell.styles.fillColor = [color[0], color[1], color[2]] as [number, number, number];
            data.cell.styles.textColor = 255;
          }
        },
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 12;
    });
  };

  // Add sections for each audit type
  addAuditSection('local_seo', 'Local SEO Analysis');
  addAuditSection('aeo', 'AEO (Answer Engine Optimization)');
  addAuditSection('voice_seo', 'Voice SEO Analysis');
  
  if (auditResults.some(r => r.audit_type === 'gbp')) {
    addAuditSection('gbp', 'Google Business Profile Analysis');
  }

  // ===== RECOMMENDATIONS PAGE =====
  doc.addPage();
  yPos = 20;
  
  doc.setFillColor(79, 70, 229);
  doc.rect(0, yPos - 10, pageWidth, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('Priority Recommendations', 20, yPos);
  
  yPos += 15;
  
  // Get critical and needs improvement items
  const priorityItems = auditResults
    .filter(r => r.status === 'critical' || r.status === 'needs_improvement')
    .sort((a, b) => {
      if (a.status === 'critical' && b.status !== 'critical') return -1;
      if (a.status !== 'critical' && b.status === 'critical') return 1;
      return a.score - b.score;
    })
    .slice(0, 10); // Top 10 priority items
  
  priorityItems.forEach((item, index) => {
    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = 20;
    }
    
    const color = getStatusColor(item.status);
    doc.setFillColor(color[0], color[1], color[2]);
    doc.circle(25, yPos - 2, 3, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(33, 33, 33);
    doc.text(`${index + 1}. ${item.item_name}`, 32, yPos);
    
    yPos += 5;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    const lines = doc.splitTextToSize(item.recommendations, pageWidth - 40);
    doc.text(lines, 32, yPos);
    yPos += lines.length * 4 + 8;
  });

  // ===== FOOTER ON ALL PAGES =====
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `${accessCodeData.client_name.replace(/[^a-z0-9]/gi, '_')}_SEO_Audit_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
