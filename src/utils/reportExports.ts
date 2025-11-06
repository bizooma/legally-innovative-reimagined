import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TimeEntryWithClient, ClientTimeTotal } from '@/types/timeEntry';
import { formatDuration } from '@/hooks/useTimeTracker';

interface ExportOptions {
  entries: TimeEntryWithClient[];
  clientTotals: ClientTimeTotal[];
  dateRange: { start?: string; end?: string };
  format: 'csv' | 'pdf';
}

export const exportTimeReport = (options: ExportOptions) => {
  if (options.format === 'csv') {
    exportAsCSV(options);
  } else {
    exportAsPDF(options);
  }
};

function exportAsCSV({ entries, clientTotals, dateRange }: Omit<ExportOptions, 'format'>) {
  const lines: string[] = [];
  
  // Header
  lines.push('Time Tracking Report');
  lines.push(`Generated: ${format(new Date(), 'PPP')}`);
  if (dateRange.start || dateRange.end) {
    const start = dateRange.start ? format(new Date(dateRange.start), 'MMM dd, yyyy') : 'Beginning';
    const end = dateRange.end ? format(new Date(dateRange.end), 'MMM dd, yyyy') : 'Present';
    lines.push(`Period: ${start} - ${end}`);
  }
  lines.push('');
  
  // Summary by Client
  lines.push('Summary by Client');
  lines.push('Client,Total Time,Entry Count');
  clientTotals.forEach(total => {
    lines.push(`"${total.client_name}",${total.total_formatted},${total.entry_count}`);
  });
  lines.push('');
  
  // Overall Total
  const totalSeconds = clientTotals.reduce((sum, t) => sum + t.total_seconds, 0);
  lines.push(`Total Time,${formatDuration(totalSeconds)}`);
  lines.push('');
  
  // Detailed Entries
  lines.push('Detailed Time Entries');
  lines.push('Date,Client,Start Time,End Time,Duration,Description');
  
  // Group by client
  const entriesByClient = new Map<string, TimeEntryWithClient[]>();
  entries.forEach(entry => {
    const clientId = entry.client_id;
    if (!entriesByClient.has(clientId)) {
      entriesByClient.set(clientId, []);
    }
    entriesByClient.get(clientId)!.push(entry);
  });
  
  // Export each client's entries
  entriesByClient.forEach((clientEntries, clientId) => {
    const clientName = clientEntries[0]?.client_name || 'Unknown Client';
    lines.push('');
    lines.push(`Client: ${clientName}`);
    
    clientEntries.forEach(entry => {
      const date = format(new Date(entry.start_time), 'MMM dd, yyyy');
      const startTime = format(new Date(entry.start_time), 'hh:mm a');
      const endTime = entry.end_time ? format(new Date(entry.end_time), 'hh:mm a') : '-';
      const duration = entry.duration_seconds ? formatDuration(entry.duration_seconds) : '-';
      const description = entry.description ? `"${entry.description.replace(/"/g, '""')}"` : '-';
      
      lines.push(`${date},"${clientName}",${startTime},${endTime},${duration},${description}`);
    });
    
    const clientTotal = clientTotals.find(t => t.client_id === clientId);
    if (clientTotal) {
      lines.push(`Subtotal,,,,,${clientTotal.total_formatted}`);
    }
  });
  
  // Create blob and download
  const csvContent = lines.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  const filename = `time-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportAsPDF({ entries, clientTotals, dateRange }: Omit<ExportOptions, 'format'>) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.text('Time Tracking Report', 14, 20);
  
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 14, 28);
  
  if (dateRange.start || dateRange.end) {
    const start = dateRange.start ? format(new Date(dateRange.start), 'MMM dd, yyyy') : 'Beginning';
    const end = dateRange.end ? format(new Date(dateRange.end), 'MMM dd, yyyy') : 'Present';
    doc.text(`Period: ${start} - ${end}`, 14, 34);
  }
  
  let yPos = dateRange.start || dateRange.end ? 42 : 36;
  
  // Summary Table
  doc.setFontSize(14);
  doc.text('Summary by Client', 14, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Client', 'Total Time', 'Entries']],
    body: clientTotals.map(total => [
      total.client_name,
      total.total_formatted,
      total.entry_count.toString()
    ]),
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // Overall Total
  const totalSeconds = clientTotals.reduce((sum, t) => sum + t.total_seconds, 0);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Time: ${formatDuration(totalSeconds)}`, 14, yPos);
  doc.setFont(undefined, 'normal');
  
  // Group entries by client
  const entriesByClient = new Map<string, TimeEntryWithClient[]>();
  entries.forEach(entry => {
    const clientId = entry.client_id;
    if (!entriesByClient.has(clientId)) {
      entriesByClient.set(clientId, []);
    }
    entriesByClient.get(clientId)!.push(entry);
  });
  
  // Detailed entries for each client
  entriesByClient.forEach((clientEntries, clientId) => {
    const clientName = clientEntries[0]?.client_name || 'Unknown Client';
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos += 12;
    }
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Client: ${clientName}`, 14, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 6;
    
    const tableData = clientEntries.map(entry => [
      format(new Date(entry.start_time), 'MMM dd, yyyy'),
      format(new Date(entry.start_time), 'hh:mm a'),
      entry.end_time ? format(new Date(entry.end_time), 'hh:mm a') : '-',
      entry.duration_seconds ? formatDuration(entry.duration_seconds) : '-',
      entry.description || '-'
    ]);
    
    const clientTotal = clientTotals.find(t => t.client_id === clientId);
    if (clientTotal) {
      tableData.push(['', '', 'Subtotal:', clientTotal.total_formatted, '']);
    }
    
    autoTable(doc, {
      startY: yPos,
      head: [['Date', 'Start', 'End', 'Duration', 'Description']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246] },
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: 22 },
        2: { cellWidth: 22 },
        3: { cellWidth: 22 },
        4: { cellWidth: 'auto' }
      },
      didParseCell: (data) => {
        // Make subtotal row bold
        if (data.row.index === tableData.length - 1 && clientTotal) {
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });
    
    yPos = (doc as any).lastAutoTable.finalY;
  });
  
  // Save the PDF
  const filename = `time-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
  doc.save(filename);
}
