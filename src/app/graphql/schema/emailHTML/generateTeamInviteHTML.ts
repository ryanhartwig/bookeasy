export const generateTeamInviteHTML = (registrationLink: string) => `
<html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
      @supports (font-variation-settings: normal) {
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=optional');
      }
      
      body {
        font-family: 'Roboto', 'Apple System', sans-serif;
        margin: 0;
        padding: 0;
      }
      
      .container {
        background-color: #f8f8f8;
        padding: 20px;
      }
      
      h1 {
        color: #333;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      
      p {
        color: #666;
        font-size: 16px;
        line-height: 1.5;
      }
      
      a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Somebody has invited you to join their team!</h1>
      <p>
        Click 
        <a href="${registrationLink}">here</a> 
        to register or sign in.
      </p>
      <p>If you did not request to join a team, please ignore this email.</p>
    </div>
  </body>
</html>
`