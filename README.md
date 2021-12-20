# [Web](https://open-museum.ch/)

Web powers [open-museum.ch](https://open-museum.ch/).

[![GitHub issues](https://img.shields.io/github/issues/open-museum/web.svg)](https://github.com/open-museum/web/issues)
[![GitHub forks](https://img.shields.io/github/forks/open-museum/web.svg)](https://github.com/open-museum/web/network)
[![GitHub stars](https://img.shields.io/github/stars/open-museum/web.svg)](https://github.com/open-museum/web/stargazers)
[![GitHub license](https://img.shields.io/github/license/open-museum/web.svg)](https://github.com/open-museum/web/blob/master/LICENSE.md)

## Installation

Install [Node](https://nodejs.org/en/download/package-manager/) and [Docker](https://docs.docker.com/get-docker/).

```bash
npm install
docker run -d -p 2095:8188 openmuseum/janus-gateway:latest
```

## Usage

To run a development server

```bash
npm run dev
```

To run a production server

```bash
docker run -d -p 80:5000 openmuseum/web:latest
```

If you want analytics you need to set up [matomo](https://matomo.org/) and change the parameters `url` and `siteId` in `src/routes/_layout.svelte` accordingly.

## Support

This project is maintained by [@open-museum](https://github.com/open-museum). Please understand that we won't be able to provide individual support via email. We also believe that help is much more valuable if it's shared publicly, so that more people can benefit from it.

| Type                                  | Platforms                                                         |
| ------------------------------------- | ----------------------------------------------------------------- |
| 🚨 **Bug Reports**                    | [GitHub Issue Tracker](https://github.com/open-museum/web/issues) |
| 🎁 **Feature Requests**               | [GitHub Issue Tracker](https://github.com/open-museum/web/issues) |
| 🛡 **Report a security vulnerability** | [GitHub Issue Tracker](https://github.com/open-museum/web/issues) |

## Roadmap

Some parts of the software were migrated to [SvelteKit](https://kit.svelte.dev/). The chat functionality was removed due to server costs and buggy implementation.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/open-museum/web/tags).

## Authors and acknowledgment

- **Aline Mähr** - _Initial work_ - [amaehr](https://github.com/amaehr)
- **Moritz Mähr** - _Initial work_ - [maehr](https://github.com/maehr)

See also the list of [contributors](https://github.com/open-museum/web/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
