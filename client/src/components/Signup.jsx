import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

export default function Signup(props) {
  const { handleSubmit, setAuthDisplay, setDisplayLogin } = props;

  const [role, setRole] = useState(null);
  const [manager, setManager] = useState(null);

  const [formData, setFormData] = useState({
    isLandlord: null,
    isCompany: null,
    firstname: "",
    lastname: "",
    companyName: "",
    username: "",
    password: "",
    email: "",
  });

  const formStyle = {
    // marginTop: 8,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: "0",
  };

  const inputButtonStyle = {
    marginBottom: "10px",
  };

  return (
    <div id="signupBox">
      <Box
        sx={formStyle}
        component="form"
        onSubmit={() => handleSubmit("signup", { ...formData })}
        noValidate
      >
        {formData.isLandlord === null ? (
          <div id="roleOption">
            I am a...
            <ToggleButtonGroup
              color="primary"
              value={role}
              exclusive
              id="roleOptionGroup"
              onChange={(event, newRole) => {
                setRole(newRole);
                if (newRole === "tenant") {
                  setFormData({ ...formData, isLandlord: false });
                } else if (newRole === "landlord") {
                  setFormData({ ...formData, isLandlord: true });
                }
              }}
            >
              <ToggleButton value="tenant" id="tenantButton">
                Tenant
              </ToggleButton>
              <ToggleButton value="landlord">Landlord</ToggleButton>
            </ToggleButtonGroup>
          </div>
        ) : (
          <>
            <h3>Signup</h3>
            {formData.isLandlord && (
              <ToggleButtonGroup
                color="primary"
                value={manager}
                exclusive
                id="compRoleGroup"
                onChange={(event, newManager) => {
                  setManager(newManager);
                  if (newManager === "individual") {
                    setFormData({ ...formData, isCompany: false });
                  } else if (newManager === "company") {
                    setFormData({ ...formData, isCompany: true });
                  }
                }}
              >
                <ToggleButton value="individual" id="individualButton">
                  Individual Manager
                </ToggleButton>
                <ToggleButton value="company">Management Company</ToggleButton>
              </ToggleButtonGroup>
            )}
            <TextField
              sx={inputButtonStyle}
              id="outlined-basic"
              label="username"
              variant="outlined"
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
            />
            {!formData.isCompany ? (
              <>
                <TextField
                  sx={inputButtonStyle}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  onChange={(event) =>
                    setFormData({ ...formData, firstname: event.target.value })
                  }
                />
                <TextField
                  sx={inputButtonStyle}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  onChange={(event) =>
                    setFormData({ ...formData, lastname: event.target.value })
                  }
                />
                <TextField
                  sx={inputButtonStyle}
                  id="outlined-basic"
                  label="Company (optional)"
                  variant="outlined"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      companyName: event.target.value,
                    })
                  }
                />
              </>
            ) : (
              <TextField
                sx={inputButtonStyle}
                id="outlined-basic"
                label="Company"
                variant="outlined"
                onChange={(event) =>
                  setFormData({ ...formData, companyName: event.target.value })
                }
              />
            )}
            <TextField
              sx={inputButtonStyle}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
            <TextField
              sx={inputButtonStyle}
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
            />
            <Button variant="contained" type="submit" sx={inputButtonStyle}>
              Signup
            </Button>
          </>
        )}
        <div className="linkButton" onClick={() => setDisplayLogin(true)}>
          Already have an account? Login.
        </div>
      </Box>
    </div>
  );
}
