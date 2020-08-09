const projects = (function getProjects() {
	if (!('projects' in localStorage)) {
		localStorage.setItem('projects', JSON.stringify([]));
	}
	return JSON.parse(localStorage.getItem('projects'));
})();

export default projects;
