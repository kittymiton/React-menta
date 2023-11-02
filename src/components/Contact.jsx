import { useState } from "react";

export const Contact = () => {

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const onChangeValue = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const validateForm = () => {
    const { name, email, message } = formData;

    if (name === "") {
      setNameError("お名前は必須です");
      return false;
    }

    if (name.length > 30) {
      setNameError("お名前は30文字以内で入力してください。");
      return false;
    }

    setNameError("");

    if (email === "") {
      setEmailError("メールアドレスは必須です");
      return false;
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      setEmailError("メールアドレスの形式が正しくありません。");
      return false;
    }

    setEmailError("");

    if (message === "") {
      setMessageError("本文は必須です。");
      return false;
    }

    if (message.length > 500) {
      setMessageError("本文は500文字以内で入力してください。");
      return false;
    }

    setMessageError("");

    return true;
  }

  const onSubmitAction = async (event) => {
    event.preventDefault();

    if (validateForm()) { // trueの場合
      try {
        const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);

        alert("送信しました");

      } catch (error) {
        // console.errorで引数のパラメータとエラーのスタックトレースをconsoleに出力
        console.error('fetchエラーです:', error);
      }

      setFormData({ name: "", email: "", message: "" });
    };
  }

  const onClickClearVal = (event) => {
    setFormData({ name: "", email: "", message: "" });
  };


  return (
    <main>
      <section>
        <h1 className="contact-title">お問い合わせフォーム</h1>
        <form onSubmit={onSubmitAction}>
          <div>
            <label htmlFor="name">お名前</label>
            <div className="write-area">
              <input id="name" type="text" value={formData.name} onChange={onChangeValue} />
              {nameError && <p>{nameError}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email">メールアドレス</label>
            <div className="write-area">
              <input id="email" type="email" value={formData.email} onChange={onChangeValue} />
              {emailError && <p>{emailError}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="message">本文</label>
            <div className="write-area">
              <textarea id="message" type="text" rows="8" value={formData.message} onChange={onChangeValue} />
              {messageError && <p>{messageError}</p>}
            </div>
          </div>

          <div>
            <button type="submit" value="submit">送信</button>
            <button type="button" onClick={onClickClearVal}>クリア</button>
          </div>
        </form>
      </section>
    </main>
  );
};
