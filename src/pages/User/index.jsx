import { useDispatch, useSelector } from "react-redux";
import { editUsername, getUserData } from "../../api/api";
import { getAuthState, getUserState } from "../../store/selectors";
import { updateUser, updateUserName } from "../../store/userSlice";
import { useEffect, useState } from "react";
import AccountContainer from "../../components/AccountContainer";
import './user.css'

const User = () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector(getAuthState)
  const userData = useSelector(getUserState)
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const username = e.target.username.value

    try {
      await editUsername(username, loggedIn)
      dispatch(updateUserName(username))
      setIsEditing(false)
    } catch (error) {
      alert("On n'a pas pu modifier votre username.")
      throw error
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      const data = await getUserData(loggedIn)
      dispatch(updateUser(data.body))
    }
      
    if(loggedIn) fetchUserData()
  }, [loggedIn])

  return (
    <div className='main bg-dark'>
      {isEditing ? (
        <div className="header">
          <h1>Edit user info</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-inputs">
              <label htmlFor="username">
                Username:
                <input type="text" name="username" id="username" defaultValue={userData.user.userName} />
              </label>
              <label htmlFor="firstName">
                Fisrt name:
                <input type="text" name="firstName" id="firstName" value={userData.user.firstName} readOnly/>
              </label>
              <label htmlFor="lastName">
                Last name:
                <input type="text" name="lastName" id="lastName" value={userData.user.lastName} readOnly/>
              </label>
            </div>
            <div className="buttons">
              <button className="edit-button" type="submit">Save</button>
              <button className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
        ) :
        (<div className="header">
          <h1>Welcome back<br />{userData?.user.firstName} {userData?.user.lastName}</h1>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
        </div>)
      }
      <h2 className="sr-only">Accounts</h2>
      <AccountContainer title="Argent Bank Checking (x8349)" amount="$2,082.79" amountDescription="Available Balance"/>
      <AccountContainer title="Argent Bank Savings (x6712)" amount="$10,928.42" amountDescription="Available Balance"/>
      <AccountContainer title="Argent Bank Credit Card (x8349))" amount="$184.30" amountDescription="Current Balance"/>
    </div>
  )
}

export default User