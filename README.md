# IP address tracker solution

This is a solution for the Front-end Engineer Job application at Arkantum Labs.

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![IP Address Tracker](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://github.com/sportiz91/ip-address-tracker-challenge)
- Live Site URL: [Add live site URL here](https://ip-address-tracker-challenge-mu.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties / CSS Modules.
- Flexbox
- Mobile-first workflow
- Separation of Concerns (UI / Services)
- [React](https://reactjs.org/) - JS library (Create React App)
- [Ipify](https://www.ipify.org/)
- [Leaflet](https://leafletjs.com/)
- [Vercel](https://vercel.com/) - Deployment
- Eslint
- Prittier

Eslint and Prittier configuration files are not removed from the repo for you to see my development configuration.

### Showcase

Use this section to recap over some of your best and proudest solutions while working through this project.

To see how you can add code snippets, see below:

```js
export const getLocationDataFromIp = async (ipOrDomain, { type = IP } = {}) => {
  try {
    let sanatizedIpOrDomain = ipOrDomain;

    if (type === IP && ipOrDomain) {
      sanatizedIpOrDomain = getIpWithDots(ipOrDomain);
    }

    if (type === DOMAIN && ipOrDomain) {
      sanatizedIpOrDomain = getSanatizedDomain(ipOrDomain);
    }

    let params = {
      apiKey: config.ipifyKey,
      ipAddress: sanatizedIpOrDomain,
    };

    if (type === IP && !ipOrDomain) {
      delete params.ipAddress;
    }

    if (type !== IP) {
      params = {
        apiKey: config.ipifyKey,
        domain: sanatizedIpOrDomain,
      };
    }

    const response = await axiosIpify.get('', { params });

    return { locationObject: response.data };
  } catch (error) {
    console.error('Error fetching location data:', error);

    return { isError: true };
  }
};
```

I'm proud of the above function. The function is fetching the data as an ip or domain, automatically, according to some parameters.

### Potential improvements

I could've improved the way in which I structured the CSS, specially giving a detailed consideration to the globals CSS. As I were building the project, I've put some globals in there, but then I override some colors in the components modules.

## Author

- Santiago Pablo Ortiz.
