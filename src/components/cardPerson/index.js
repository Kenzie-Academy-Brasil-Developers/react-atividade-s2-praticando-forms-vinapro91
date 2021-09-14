import "./style.css"
const UserCard = ({userInfo}) => {
    return (
        <div>
        <p>Nome: {userInfo && userInfo.name}</p>
        <p>Usuario: {userInfo && userInfo.userName}</p>
        <p>e-mail: {userInfo &&  userInfo.email}</p>
      </div>
    )
} 

export default UserCard