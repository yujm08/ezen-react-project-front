//특정 라이브러리가 가진 기능을 import할 때는 {}를 사용한다.
import { RouterProvider } from 'react-router-dom';
import './App.css';
import root from './router/root';

function App() {
  return (
    <RouterProvider router={root}></RouterProvider>
  );
}

export default App;
