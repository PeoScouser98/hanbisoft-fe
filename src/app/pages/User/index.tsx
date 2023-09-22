import React from 'react';
import RegisterForm from './components/RegisterForm';
import UserList from './components/UserList';

export default function UsersPage() {
	return (
		<React.Fragment>
			<RegisterForm />
			<UserList />
		</React.Fragment>
	);
}
