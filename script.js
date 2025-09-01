document.getElementById('queryBtn').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value.trim();
    const resultSection = document.getElementById('resultSection');

    if (name === '') {
        resultSection.innerHTML = '<p style="color: red;">請輸入訂購人姓名。</p>';
        return;
    }

    // 替換成您發布的 Google Apps Script 或 CSV URL
    const API_URL = '您的 Google Apps Script URL 或 CSV URL';

    resultSection.innerHTML = '<p>正在查詢中，請稍候...</p>';

    try {
        // 如果您使用 Apps Script，這裡的 URL 應該包含查詢參數
        // 例如: const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`);
        
        // 如果您使用 CSV，則需要先下載所有資料
        const response = await fetch(API_URL);
        const csvData = await response.text();
        const rows = csvData.split('\n').map(row => row.split(','));

        // 找到訂單人姓名符合的資料
        const orders = rows.filter(row => row[1] === name); // 假設姓名在第二欄

        if (orders.length > 0) {
            let html = `<h2>${name} 的訂單資訊</h2><table><thead><tr><th>時間戳記</th><th>訂購人姓名</th><th>...其他欄位...</th></tr></thead><tbody>`;
            orders.forEach(order => {
                html += `<tr><td>${order[0]}</td><td>${order[1]}</td><td>...</td></tr>`;
            });
            html += '</tbody></table>';
            resultSection.innerHTML = html;
        } else {
            resultSection.innerHTML = `<p>查無「${name}」的訂單。</p>`;
        }

    } catch (error) {
        resultSection.innerHTML = '<p style="color: red;">查詢失敗，請稍後再試。</p>';
        console.error('Error fetching data:', error);
    }
});
