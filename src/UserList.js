import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';

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
          <Typography gutterBottom variant="headline" component="h2">
            {user.login}
          </Typography>
          <Button color="primary" variant="contained">View Repos</Button>
        </CardContent>
      </Card>
    </Grid>
  );

export default UserList;