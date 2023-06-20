import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout';
import BasicCompletion from './basic-completion';
import { ChooseYourOwnAdventure } from './choose-your-adventure';
import RecipeWrapper from './recipe/page';
import { BasicChat } from './basic-chat';
import { DocsChat } from './docs-chat';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <ChooseYourOwnAdventure />,
      },
      {
        path: '/basic-completion',
        element: <BasicCompletion />,
      },
      {
        path: '/basic-chat',
        element: <BasicChat />,
      },
      {
        path: '/docs-chat',
        element: <DocsChat />,
      },
      {
        path: '/recipe',
        element: <RecipeWrapper />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
