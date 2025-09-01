// script.js (優化後)

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
                html += `<p><strong>訂購人：</strong> ${order['訂購人姓名']}</p>`;
                html += `<p><strong>取貨方式：</strong> ${order['取貨方式']}</p>`;
                html += `<p><strong>收件人姓名：</strong> ${order['收件人姓名']}</p>`;
                html += `<p><strong>收件人地址：</strong> ${order['收件人地址']}</p>`;
                
                // 處理商品訂購數量，只顯示有訂購的商品
                html += `<h4>訂購明細：</h4><ul>`;
                
                // 根據您的 CSV 檔案，商品名稱從第 12 欄開始
                const products = [
                    '特選柚 10斤裝', '特選柚 5斤裝', '大器柚 10斤裝',
                    '雞蛋柚 10斤裝', '雞蛋柚 5斤裝', '紅文旦 10斤裝'
                ];
                
                products.forEach(productName => {
                    const quantity = order[productName] || 0;
                    if (quantity > 0) {
                        html += `<li>${productName}：<strong>${quantity}</strong> 箱</li>`;
                    }
                });

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
