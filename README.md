# Auth Frontend Next

The next generation of Frontend of Auth Service for the Open Tree Hole project.

## Deploy

Install
This installation is just for frontend program. If you want to deploy the whole OpenTreeHole project, please visit Deploy Repo.

This project continuously integrates with docker. Go check it out if you don't have docker locally installed.
1. Download the [docker-compose.yaml](https://github.com/OpenTreeHole/auth-frontend-next/blob/master/docker-compose.yaml).
    ```bash
    wget https://raw.githubusercontent.com/OpenTreeHole/auth_frontend/master/docker-compose.yaml
    ```

2. Create a ```.env``` file under the same directory with ```docker-compose.yaml```.
    ```bash
    nano .env
    ```
    
    To know more about environmental variables in docker, visit [Environment variables in Compose](https://docs.docker.com/compose/environment-variables/).

3. Set all environmental variables. The required env variables are listed below.
   These env variables would be used to replace the bundled js by ```entryPoint.sh``` , and it uses  | as separator. **Thus, if you need to use | in your env variable, please use \ to trope it.**
   ```dotenv
   # .env file
   
   # The backend api address for Auth
   AUTH_URL=https://auth.fduhole.com/api/
   
   # The domain used to store cookie.
   # For local deployment, this should be localhost .
   COOKIE_DOMAIN=.fduhole.com
   ```

4. Docker Compose

   Check if the port 3001 is available. 
   You can change these port in ```docker-compose.yaml```.
   ```bash
   docker-compose up
   ```

5. Visit http://localhost:3001/ to see if the deployment is successful.

## Contribute

Feel free to dive in! [Open an issue](https://github.com/OpenTreeHole/auth_frontend/issues/new) or submit PRs.

### Development

```bash
# Clone the repository
git clone https://www.github.com/OpenTreeHole/auth-frontend-next.git
cd auth-frontend-next
# Install Dependencies
pnpm
# Run The Dev Server
pnpm dev
```

To build the project, run
```shell
pnpm build
```

Confirm that you've modified the env variables in  `.env.production`.

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/OpenTreeHole/auth-frontend-next/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=OpenTreeHole/auth-frontend-next" />
</a>
