import React, { ReactNode } from "react";
import { Account } from "../fakedata";
import { Box, Container, Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import SecurityIcon from "@material-ui/icons/Security";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { Accounts } from "../App";

export const SingleAccountView: React.FC<{}> = props => {
  let { id } = useParams();
  const { accounts } = Accounts.useContainer();
  const a: Account = accounts.filter(a => a.id == id)[0];
  const deleteAccount = (event: React.SyntheticEvent) => true; // need to implement

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box>
          <div
            style={{
              backgroundSize: "cover",
              width: "100vw",
              height: "200px",
              backgroundImage: `url(${a.backgroundImage})`,
              backgroundPosition: "center",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            {a.compromised && (
              <Avatar>
                <NoEncryptionIcon></NoEncryptionIcon>
              </Avatar>
            )}
            {a.supportsTwoFA && (
              <Avatar>
                <SecurityIcon
                  color={a.twoFA ? "primary" : undefined}
                ></SecurityIcon>
              </Avatar>
            )}
          </div>
          <Typography variant="h4" gutterBottom>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                {a.id}
              </Grid>
              <Grid item xs={4}>
                <Link href={a.url}>Visit</Link>
              </Grid>
              <Grid item xs={4}>
                <Link href={a.url}>Delete</Link>
              </Grid>
            </Grid>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Account Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Info title="username" content={a.username}></Info>
            </Grid>
            <Grid item xs={6}>
              <Info title="email" content={a.email}></Info>
            </Grid>
            <Grid item xs={6}>
              <Info
                title="account created"
                content={
                  a.created.getDay() +
                  "/" +
                  a.created.getMonth() +
                  "/" +
                  a.created.getFullYear()
                }
              ></Info>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" gutterBottom>
            Account Protection
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Info
                title="2FA"
                content={a.twoFA ? "enabled" : "not enabled"}
              ></Info>
            </Grid>
            <Grid item xs={6}>
              <Info
                title="password strength"
                content={String(a.password.length)}
              ></Info>
            </Grid>
            <Grid item xs={6}>
              <Info
                title="last log-in"
                content={
                  a.lastLoggedIn.getDay() +
                  "/" +
                  a.lastLoggedIn.getMonth() +
                  "/" +
                  a.lastLoggedIn.getFullYear()
                }
              ></Info>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

function Info(props: { title: string; content: string }) {
  return (
    <TextField
      id="standard-read-only-input"
      label={props.title}
      defaultValue={props.content}
      InputProps={{
        readOnly: true
      }}
    />
  );
}
