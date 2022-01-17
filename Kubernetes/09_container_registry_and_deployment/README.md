<img src="../../../img/logo.png" alt="Chmurowisko logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Container Registry and Deployment

## Lab Overview

In this lab you will create Azure Container Registry and push a container image to it. Then you'll configure Kubernetes to pull images from the registry and run them on a cluster.

## Task 1: Run application locally

1. Go to `/app` directory and install application dependencies

    ```bash
    npm i
    ```

1. Start the application:

    ```bash
    npm start
    ```

1. Using second Cloud Shell session, verify the application is responding to requests:

    ```bash
    curl localhost:8081
    ```

1. Stop the application using `Ctrl-C`

## Task 2: Create Azure Container Registry (ACR)

1. Create Azure Container Registry (ACR):

    ```bash
    az acr create -n acrcmstXX -g rgcmstXX --sku Basic --admin-enabled true
    ```

    `acrcmstXX` is ACR name. Make sure to change `XX` to your student login number.

1. Get admin credentials that you'll use to authenticate to ACR:

    ```bash
    az acr credential show -n <ACR_name>
    ```

1. Build a container image using ACR:

    ```bash
    az acr build -t cm-acr-app:latest -r <ACR_name> .
    ```

    After build image will be stored inside ACR.

1. Verify that image is stored inside ACR:

    ```bash
    az acr repository list --name <ACR_name>
    az acr repository show-tags --repository cm-acr-app --name <ACR_name>
    ```

## Task 3: Create Kubernetes secret with ACR credentials

1. Create Kubernetes Secret using command below. Make sure to provide credentials for your account.

    ```bash
    kubectl create secret docker-registry dockerregistrycredential --docker-server=<ACR_name>.azurecr.io --docker-username=<ACR_name> --docker-password=<password>
    ```

1. Verify that secret is created

    ```bash
    kubectl get secret
    ```

## Task 4: Create Deployment and Service on Kubernetes

1. Open [files/cm-acr-app.yaml](./files/cm-acr-app.yaml) and verify its contents
1. Update the `.spec.template` section:

    ```yaml
    template:
      metadata:
        labels:
          app: cm-acr-app
      spec:
        containers:
        - name: app
          image: <ACR_name>.azurecr.io/cm-acr-app # update <ACR_name>
          ports:
          - containerPort: 8080
        imagePullSecrets:
        - name: dockerregistrycredential
    ```

1. Apply the updated file to Kubernetes:

    ```bash
    kubectl apply -f cm-acr-app.yaml
    ```

1. Get IP for cm-acr-app Service and visit it in browser.

    ```bash
    kubectl get svc
    ```

## Task 5: Delete resources created during this lab

1. Delete Kubernetes resources

    ```bash
    kubectl delete -f cm-acr-app.yaml
    ```

1. Delete ACR:

    ```bash
    az acr delete --yes --name <ACR_name>
    ```

## END LAB

<br><br>

<center><p>&copy; 2021 Chmurowisko Sp. z o.o.<p></center>
