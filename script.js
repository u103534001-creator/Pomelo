document.getElementById('queryBtn').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value.trim();
    const resultSection = document.getElementById('resultSection');

    if (name === '') {
        resultSection.innerHTML = '<p style="color: red;">請輸入訂購人姓名。</p>';
        return;
    }

    // 替換成您發布的 Google Apps Script URL
    const API_URL = 'https://script.google.com/macros/s/AKfycbww6aTLD6s-4413fn3cjowoC8P6sltGtGs6TYqGkkKekCl11jRGtWTqtExjkVMJHgjZag/exec';

    resultSection.innerHTML = '<p>正在查詢中，請稍候...</p>';

    try {
        const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`);
        const orders = await response.json();

        if (orders && orders.length > 0) {
            let html = `<h2>${name} 的訂單資訊</h2><table><thead><tr>`;
            // 動態生成表格標題
            for (const key in orders[0]) {
                html += `<th>${key}</th>`;
            }
            html += `</tr></thead><tbody>`;
            // 動態生成表格內容
            orders.forEach(order => {
                html += `<tr>`;
                for (const key in order) {
                    html += `<td>${order[key]}</td>`;
                }
                html += `</tr>`;
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
