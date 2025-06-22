// UserGreeting.jsx
import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";

function Greeting(props) {
  const { user, handleLogout } = props;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
      <Menu secondary style={{ padding: "0.8rem 1.5rem" }}>
        <Menu.Item header>Hi, {user.name}</Menu.Item>

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
                    title={user.name}
                  />
                </span>
              }
              pointing="top right"
              icon={null}
            >
              <Dropdown.Menu>
                <Dropdown.Header content={user.name} />
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
