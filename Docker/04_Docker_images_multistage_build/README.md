<img src="../../img/logo.png" alt="Chmurowisko logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Building docker images

## LAB Overview

In this lab you will create a docker image for an ASP.NET Core application using multistage process.

## Task 1: Build the image

1. Go to `/app` directory and print the content of Dockerfile using `cat Dockerfile`

    ```bash
    $ cat Dockerfile

    FROM mcr.microsoft.com/dotnet/sdk:3.1 as build

    WORKDIR /app

    COPY *.csproj ./
    RUN dotnet restore

    COPY . ./
    RUN dotnet build -c Release -o out

    FROM mcr.microsoft.com/dotnet/aspnet:3.1
    WORKDIR /app
    COPY --from=build /app/out .

    CMD ["dotnet", "Sample.dll"]
    ```

    See how you using `FROM` keyword twice. `FROM mcr.microsoft.com/dotnet/sdk:3.1 as build` specifies the container image that will be used for building the .NET application and be deleted afterward. This image has all dependencies required to build a .NET application. 
    
    The `FROM mcr.microsoft.com/dotnet/aspnet:3.1` specify the container that will run your application. The `aspnet:3.1` container has only the runtime required for running ASP.NET Core 3.1 applications. That means there is no `MSBuild` tool, so you won't build your application using just this image - you need to implement a multistage process.

    Using a multistage process, the application artifacts are copied from the build container (`sdk:3.1`) to the runtime container (`aspnet:3.1`).

1. Create an image using `docker build`

    ```bash
    docker build -t sample:1.0.0 .
    ```

1. List the container images that you have

    ```bash
    docker images
    ```

1. Run your application using `docker run`

    ```bash
    docker run -p 8080:80 sample:1.0.0
    ```

1. Make a request to application using `curl`

    ```bash
    $ curl localhost:8080

    Hello World
    ```

1. Stop the application using `Ctrl-C`

## END LAB

<br><br>

<center><p>&copy; 2021 Chmurowisko Sp. z o.o.<p></center>
