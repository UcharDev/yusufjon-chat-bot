async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value.trim();
  if (!userText) return;

  chatBox.innerHTML += `<p><strong>Siz:</strong> ${userText}</p>`;
  input.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Sen Yusufjon AI chatbot’isan. Har qanday tilni bilasan. Har bir fan: matematika, tarix, informatika, fizika, dasturlash, va boshqalar bo‘yicha tushunarli va foydali javob berasan. Sen juda aqlli, foydali, odobli va insonlarga yordam beradigan sun’iy intellektsan. Seni Sodiqjonov Yusufjon yaratgan. Kim so‘rasa, 'Meni Sodiqjonov Yusufjon yaratgan' de.\n\nFoydalanuvchi: " + userText + "\nYusufjon AI:",
        max_tokens: 200
      })
    });

    if (!response.ok) throw new Error("Xatolik: " + response.status);

    const data = await response.json();
    const reply = data.choices?.[0]?.text?.trim() || "Kechirasiz, javob topilmadi.";
    chatBox.innerHTML += `<p><strong>Yusufjon AI:</strong> ${reply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<p style="color:red;"><strong>Xatolik:</strong> ${err.message}</p>`;
  }
}
