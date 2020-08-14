// Initialize projects array when app is loaded
const projects = (function getProjects() {
	if (!('projects' in localStorage)) {
		const defaultProject = { title: 'All tasks', id: 'default', tasks: [] };
		localStorage.setItem('projects', JSON.stringify([defaultProject]));
		// localStorage.setItem('projects', JSON.stringify([projects]));
	}
	return JSON.parse(localStorage.getItem('projects'));
})();

export default projects;
