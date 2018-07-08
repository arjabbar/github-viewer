import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from "react-router-dom";

const UserList = ({ users }) =>  
  (
    <div className="user-list-container">
      <Grid className="user-list" container alignItems="flex-start">
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </Grid>
    </div>
  )

const User = ({ user }) =>  
  (
    <Grid item xs={4}>
      <Card style={{display: 'flex', padding: 15}}>
        <CardMedia image={user.avatar_url} title={user.login} style={{height: 100, width: 100}}>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom noWrap variant="headline" component="h2" style={{
            maxWidth: '80%'}}>
            {user.login}
          </Typography>
          <Button color="primary" variant="contained" component={Link} to={`/users/${user.login}/repos`}>View Repos</Button>
        </CardContent>
      </Card>
    </Grid>
  );

export default UserList;