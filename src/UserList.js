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
          <Typography gutterBottom variant="headline" component="h2" style={{
            whiteSpace: 'nowrap', 
            overflowX: 'hidden', 
            maxWidth: '80%', 
            textOverflow: 'ellipsis'}}>
            {user.login}
          </Typography>
          <Button color="primary" variant="contained" component={Link} to={`/users/${user.id}/repos`}>View Repos</Button>
        </CardContent>
      </Card>
    </Grid>
  );

export default UserList;