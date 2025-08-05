// UserGreeting.jsx
import React, { useContext, useEffect } from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Greeting() {
  const { user, handleLogout } = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  if (user === null) {
    return null;
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
      <Menu secondary style={{ padding: "0.8rem 1.5rem" }}>
        <Menu.Item header>Hi, {user.username}</Menu.Item>

        <Menu.Menu position="right">
          {user && (
            <Dropdown
              item
              trigger={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Image
                    avatar
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                    alt="avatar"
                    title={user.username}
                  />
                </span>
              }
              pointing="top right"
              icon={null}
            >
              <Dropdown.Menu>
                <Dropdown.Header content={user.username} />
                <Dropdown.Item text="Profile" icon="user" />
                <Dropdown.Item
                  text="Logout"
                  icon="sign out"
                  onClick={handleLogout}
                />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Greeting;
