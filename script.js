// script.js (新增總金額計算)

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

            // 每個商品的單價
            const prices = {
                '特選柚 10斤裝': 800,
                '特選柚 5斤裝': 400,
                '大器柚 10斤裝': 500,
                '雞蛋柚 10斤裝': 700,
                '雞蛋柚 5斤裝': 350,
                '紅文旦 10斤裝': 650
            };
            
            orders.forEach((order, index) => {
                let totalAmount = 0; // 初始化總金額
                
                // 開始一個新的卡片
                html += `<div class="order-card">`;
                html += `<h3>訂單 #${index + 1}</h3>`;
                
                // 顯示基本訂購資訊
                html += `<p><strong>訂購人：</strong> ${order['訂購人姓名']}</p>`;
                html += `<p><strong>取貨方式：</strong> ${order['取貨方式']}</p>`;
                html += `<p><strong>收件人姓名：</strong> ${order['收件人姓名']}</p>`;
                html += `<p><strong>收件人地址：</strong> ${order['收件人地址']}</p>`;
                
                // 處理商品訂購數量，並計算總金額
                html += `<h4>訂購明細：</h4><ul>`;
                
                for (const key in order) {
                    if (key.includes('斤裝')) {
                        const quantity = parseInt(order[key], 10) || 0;
                        if (quantity > 0) {
                            const shortName = key.split('（')[0].trim();
                            html += `<li>${shortName}：<strong>${quantity}</strong> 箱</li>`;
                            
                            // 根據商品名稱尋找對應的價格並加總
                            if (prices[shortName]) {
                                totalAmount += prices[shortName] * quantity;
                            }
                        }
                    }
                }
                
                html += `</ul>`;
                
                // 顯示總金額
                html += `<h4>總金額：</h4><p><strong>新台幣 ${totalAmount} 元</strong></p>`;
                
                html += `</div>`;
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
