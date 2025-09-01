document.getElementById('queryBtn').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value.trim();
    const resultSection = document.getElementById('resultSection');

    if (name === '') {
        resultSection.innerHTML = '<p style="color: red;">請輸入訂購人姓名。</p>';
        return;
    }

    const API_URL = 'https://script.google.com/macros/s/AKfycbww6aTLD6s-4413fn3cjowoC8P6sltGtGs6TYqGkkKekCl11jRGtWTqtExjkVMJHgjZag/exec';

    resultSection.innerHTML = '<p>正在查詢中，請稍候...</p>';

    try {
        const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`);
        const orders = await response.json();

        if (orders && orders.length > 0) {
            let html = `<h2>${name} 的訂單資訊</h2>`;
            
            orders.forEach((order, index) => {
                // 開始一個新的卡片
                html += `<div class="order-card">`;
                html += `<h3>訂單 #${index + 1}</h3>`;
                
                // 顯示基本訂購資訊
                html += `<p><strong>訂購人：</strong> ${order['訂購人姓名']}</p>`;
                html += `<p><strong>取貨方式：</strong> ${order['取貨方式']}</p>`;
                html += `<p><strong>收件人姓名：</strong> ${order['收件人姓名']}</p>`;
                html += `<p><strong>收件人地址：</strong> ${order['收件人地址']}</p>`;
                
                // 處理商品訂購數量，只顯示有訂購的商品
                html += `<h4>訂購明細：</h4><ul>`;
                
                // 檢查訂單物件的所有鍵，找到商品欄位
                for (const key in order) {
                    // 根據 Google Sheet 欄位名稱來判斷是否為商品
                    if (key.includes('斤裝')) {
                        const quantity = order[key] || 0;
                        if (quantity > 0) {
                            // 將完整的商品名稱截短，讓顯示更美觀
                            const shortName = key.split('（')[0].trim();
                            html += `<li>${shortName}：<strong>${quantity}</strong> 箱</li>`;
                        }
                    }
                }
                
                html += `</ul></div>`;
            });
            
            resultSection.innerHTML = html;
        } else {
            resultSection.innerHTML = `<p>查無「${name}」的訂單。</p>`;
        }
    } catch (error) {
        resultSection.innerHTML = '<p style="color: red;">查詢失敗，請稍後再試。</p>';
        console.error('Error fetching data:', error);
    }
});
