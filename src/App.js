import "./App.css";
import { Form, Input, Button } from "antd";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [form] = Form.useForm();

  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef(null);

  function onChange(_value) {
    setIsVerified(true);
  }

  const onFinish = (values) => {
    form.resetFields();
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setIsVerified(false);
    alert(`Hi ${values?.username ?? ""}`);
  };

  return (
    <div className="App">
      <h3>reCAPTCHA Demo</h3>
      <Form
        form={form}
        layout="vertical"
        className="form-container"
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isVerified}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
