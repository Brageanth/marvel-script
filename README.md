# Marvel Script

This application utilizes the Spectrum character as a focal point to retrieve comprehensive information from the Marvel API using a Python script. The script collects data from other characters featured in her comics and stores it in a MongoDB collection. Ultimately, the accumulated data is presented in a tabular format within a Next.js application.

## Usage

1. The application incorporates Docker functionality. As a result, the initial step involves installing the Docker service on your machine. ([You can refer to the installation instructions provided for your specific operating system.](https://www.docker.com/)).

2. Once you have Docker Compose installed, the next step is to build the container using the following command:

```bash
$ docker compose build
```

3. After the build process is complete, you can proceed to run the container by executing the following command:

```bash
$ docker compose up -d
```

4. Lastly, you can access and view the [tabulated data at this location](http://localhost:3000/).