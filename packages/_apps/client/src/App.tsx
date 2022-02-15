import React from 'react';
import ReactImage from './react.png';
import { test } from '@dieta-libs/common';

interface IAppProps{
	test?: string;
}

export const App: React.FunctionComponent<IAppProps> = () => {
	const [name, setName] = React.useState<any>(null);

	React.useEffect(()=> {
		const fetchData = async () => {
			try {
				const res = await fetch('/api/getUsername');
				const data = await res.json();
				if (data) {
					setName(data.name);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<div>
			<strong>
				Variabila `{test}` - importat din _libs/common
			</strong>
			<div>
				<strong>
					Varibila `{name && name}` - setata din server
				</strong>
			</div>
			<img src={ReactImage} alt="react" />
		</div>
	)
}