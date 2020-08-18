import react from 'react'


function logout() {
    localStorage.clear();
    window.location.href = '/';
};

export default logout;