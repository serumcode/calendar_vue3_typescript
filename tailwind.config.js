module.exports = {
    important:true,
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
      textColor: theme => ({
        ...theme('colors'),
        'primary':'#82a627',
        'primary-dark':'#054b00',
        'dark':'#052903',
        'secondary':'#377907',  
      }),
     
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary':'#82a627',
        'primary-dark':'#054b00',
        'dark':'#052903',
        'secondary':'#377907',       
     
       }),
       borderColor: theme => ({
        ...theme('colors'),
         //DEFAULT: theme('colors.gray.300', 'currentColor'),
        'primary':'#82a627',
        'primary-dark':'#054b00',
        'dark':'#052903',
        'secondary':'#377907',
       }),
      extend: {
        animation: {
          'spin-slow': 'spin 2s linear infinite',
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  