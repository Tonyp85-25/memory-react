import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
	const location = useLocation();
	const isHome = location.pathname === "/";
	return (
		<header className="container-fluid">
			<nav>
				<ul>
					<li>
						<strong>
							<Link to="/" className="secondary">
								Memory Game
							</Link>
						</strong>
					</li>
				</ul>

				{!isHome && (
					<ul>
						<li>
							<Link to="/easy">Easy</Link>
						</li>
						<li>
							<Link to="/hard">Hard</Link>
						</li>
					</ul>
				)}
			</nav>
		</header>
	);
};

export default Navigation;
