import "./App.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import UserCard from "./components/cardPerson";

function App() {
  const [userInfo, setUserInfo] = useState();
  const formSchema = yup.object().shape({
    userName: yup.string().required("Nome de usuario obrigatório"),
    name: yup
      .string()
      .required("Nome obrigatório")
      .matches(/^[A-Za-zÀ-ü ]{0,18}$/, "nome muito grande"),
    email: yup.string().required("E-mail obrigatório").email("email invalido"),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email"), null], "Confirmação de e-mail invalido"),
    password: yup.string().required("Senha Invalida"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Confirmação de senha invalida"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const onSubmitFunction = (data) => setUserInfo(data);
  console.log(userInfo);
  return (
    <div className="App">
      <header className="App-header">
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <input
            className="input"
            placeholder="nome de usuario"
            {...register("userName")}
          />
          <p>{errors.userName?.message}</p>
          <input
            className="input"
            placeholder="nome completo"
            {...register("name")}
          />
          <p>{errors.name?.message} </p>
          <input
            className="input"
            placeholder="e-mail"
            {...register("email")}
          />
          <p>{errors.email?.message} </p>
          <input
            className="input"
            placeholder="confirme o e-mail"
            {...register("confirmEmail")}
          />
          <p>{errors.confirmEmail?.message} </p>
          <div className="password">
            <input
              className="input-password"
              placeholder="senha"
              type="password"
              {...register("password")}
            />

            <input
              className="input-password"
              placeholder="confirme a senha"
              type="password"
              {...register("confirmPassword")}
            />
          </div>
          <p>{errors.password?.message}</p>
          <p>{errors.confirmPassword?.message}</p>
          <div className="checkbox">
            <input type="checkbox" {...register("userTerms")} />
            <label> Aceito os termos de uso do app</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" {...register("news")} />
            <label> Gostaria de receber Noticias</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" {...register("promo")} />
            <label> Gostaria de receber promoções</label>
          </div>
          <button type="submit">Cadastrar </button>
        </form>
        <UserCard userInfo={userInfo} />
      </header>
    </div>
  );
}

export default App;
