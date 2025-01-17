import OpenAI from "openai";
import { TokenDefiActivity } from "../model";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    timeout: 10000,
    dangerouslyAllowBrowser: true,
});

export const analyzeTradingData = async (transactions: TokenDefiActivity[]) => {

    const prompt = `
    Phân tích dữ liệu giao dịch sau đây và trả về **chỉ JSON** với các trường sau:
    {
    "tradingStyle": "Casual hoặc Active",
    "averageHoldDuration": "Thời gian giữ trung bình (giờ)",
    "winRate": "Tỷ lệ thắng (%)",
    "suggestions": "Gợi ý cải thiện",
    "riskLevel": "Thấp, Trung bình hoặc Cao"
    }
    Lưu ý: Tôi muốn phân tích tỷ lệ thắng thua bằng cách so sánh giá mua và bán. Nếu giá bán cao hơn giá mua, đó là thắng, ngược lại là thua và trả về số liệu sẽ kèm theo % trả về chuỗi.
    Lưu ý: Nếu giao dịch của bạn chỉ bao gồm mua hoặc chỉ bao gồm bán, thời gian giữ sẽ không được tính toán chính xác. Trong trường hợp này, kết quả sẽ trả về thông báo rằng bạn chưa có giao dịch bán hoặc mua tương ứng. Nếu có đủ dữ liệu giao dịch, kết quả sẽ được trả về kèm theo giá trị thời gian giữ.
    Lưu ý: Nếu có đủ giao dịch mua và bán, hãy tỉ lệ thắng dựa trên chênh lệch mua và bán và trả về thêm kiểu thời gian ví dụ 1h.
    Lưu ý: Nên trả lời ngắn gọn.
    Thêm yêu cầu phân tích sau:
    - “You usually sell too early when token price is going up.”
    - “You usually buy the dip too early when token price is going down.”
    - “You frequently buy the top of newly launched tokens.”
    Thêm phân tích cho copy-trading:
    - “This trader has a high win rate. His typical hold duration is [X hours], and typically sells after a profit of [X%].”
    trả về data ngôn ngữ en-US
    Dữ liệu giao dịch:
    ${transactions
            .map(
                (tx, index) => `
    ${index + 1}. 
    - Mã giao dịch: ${tx.trans_id}
    - Loại: ${tx.routers.token1 === "So11111111111111111111111111111111111111112" ? "Bán" : "Mua"
                    }
    - Số lượng: ${(tx.routers.amount1 / 10 ** tx.routers.token1_decimals).toFixed(2)} ${tx.routers.token1
                    }
    - Giá trị (USD): ${tx.value.toFixed(2)}
    - Thời gian: ${new Date(tx.block_time * 1000).toLocaleString()}`
            )
            .join("\n")}

    **Hãy trả về kết quả dưới dạng JSON duy nhất, không có bất kỳ văn bản nào khác. Ví dụ:**
    {
    "tradingStyle": "Casual",
    "averageHoldDuration": 24,
    "winRate": 50,
    "suggestions": "Nên giao dịch thường xuyên hơn để tăng dữ liệu.",
    "riskLevel": "Medium",
    "copyTradingAnalysis": "This trader has a high win rate. His typical hold duration is 24 hours, and typically sells after a profit of 10%."
    }
`;

    try {
        const response = await openai.chat.completions.create({
            model: 'chatgpt-4o-latest',
            messages: [
                {
                    role: 'system',
                    content: 'Bạn là một chuyên gia phân tích tài chính. Trả về dữ liệu JSON duy nhất, không có bất kỳ văn bản nào khác.',
                },
                { role: 'user', content: prompt },
            ],
        });

        // Parse response from OpenAI
        let result = response.choices[0].message.content;
        if (!result) {
            throw new Error("Không thể phân tích dữ liệu giao dịch.");
        }

        // Chuẩn hóa phản hồi, loại bỏ dấu backticks và phần dư thừa
        result = result.trim().replace(/^```json/, '').replace(/```$/, '');


        // Try to parse JSON from the result
        let analysis: {
            tradingStyle: string | null;
            averageHoldDuration: number | null;
            winRate: number | null;
            suggestions: string | null;
            riskLevel: string | null;
        };

        try {
            analysis = JSON.parse(result || '{}');
            // console.log("Kết quả phân tích:", analysis);
            return analysis; // Trả về dữ liệu đã xử lý
        } catch (parseError) {
            console.error("Lỗi khi parse JSON từ phản hồi GPT:", parseError);
            throw new Error("Không thể parse phản hồi GPT thành JSON.");
        }
    } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu giao dịch:', { error });
        throw new Error("Không thể phân tích dữ liệu giao dịch.");
    }
};