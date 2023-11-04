# Memory game

Made with React and vite

## Changelog

- React-router added to manage different pages with client-side routing
- Notistack added for notifications
- End of game makes board unplayable and triggers message
- Typescript added and linters and test config updated
- React upgraded to v17, jest and react-testing-library updated too
- Migration from Create-React-App to Vite for dev utilities
- Timer Component created
- Cards game logic implemented
- Board and Cards component created

## Issues during developement

- Upgrade to _React 18_ impossible due to failing tests with _jest_'s faketimers working properly with React 17
- Incompatibility with _React-router 6_ that is based on _react 18_ types -> downgrade to v5
- The issue above persisted after downgrade due to vite's cache -> now i use `vite --force` command instead of just `vite` to launch the dev server
