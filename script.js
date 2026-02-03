const API_URL = '10.0.1.61';  // ← změň na svou IP, pokud .local nefunguje

async function nactiData() {
  try {
    const odpoved = await fetch(API_URL);
    if (!odpoved.ok) throw new Error('Chyba sítě: ' + odpoved.status);
    
    const data = await odpoved.json();
    if (data.error) throw new Error(data.error);

    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    data.forEach(entry => {
      const row = document.createElement('tr');
      if (entry.status === 'Mluví...') row.classList.add('active');

      row.innerHTML = `
        <td>${entry.time || '-'}</td>
        <td>${entry.from || '-'}</td>
        <td>${entry.tg || '-'}</td>
        <td>${entry.status || '-'}</td>
        <td>${entry.event.substring(0, 80)}${entry.event.length > 80 ? '...' : ''}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Chyba:', err);
    document.getElementById('tableBody').innerHTML = `<tr><td colspan="5" style="color:red; text-align:center;">Chyba načítání dat: ${err.message}</td></tr>`;
  }
}

// Spustit hned a pak každých 6 sekund
nactiData();

setInterval(nactiData, 6000);
