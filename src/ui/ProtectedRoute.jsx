import styled from 'styled-components';

import { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router-dom';

import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1 Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2 if no auth, redirect to the /login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  //3 while load show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4 if there is user, render app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
