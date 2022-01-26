<img src="../../../img/logo.png" alt="Chmurowisko logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# Labels
## LAB Overview

In this lab, you will work with Labels and you will see how a canary deployment works.

* *Labels* provide identifying metadata for objects. These are fundamental qualities of the object that will be used for grouping, viewing, and operating.

## Task 1: Creating Deployment - version 1.0:

1. Create a deployment from [file](./files/old_deployment.yaml):
    
    ```bash
    kubectl create -f old_deployment.yaml
    ```

1. Check whether you have successfully deployed 4 pods with appropraite labels:

    ```bash
    kubectl get pods --show-labels
    ```

## Task 2: Creating Service
1. Open a [service file](./files/service.yaml) and analyze a code, especially **selector** section:
    
    ```yaml
    selector:
      app: deployment
      version: "1.0"
    ```
1. Create a service type LoadBalancer from [file](./files/service.yaml)
    
    ```bash
    kubectl create -f service.yaml
    ```

1. Check whether you have successfully deployed service with an external IP:

    ```bash
    kubectl get service
    ```

1. Using any browser of your choice, navigate to **EXTERNAL-IP** address. The output should display information about version of your deployment - **version: 1.0**. 

    Also in the terminal, you can check the output by type:
    ```bash
    curl <EXTERNAL-IP of your service>
    ```

## Task 3: Creating another Deployment - version 2.0:

1. Create a deployment from [file](./files/canary_deployment.yaml):
    
    ```bash
    kubectl create -f canary_deployment.yaml
    ```

1. Check whether you have successfully deployed 1 pods with appropraite labels (version 2.0):

    ```bash
    kubectl get pods --show-labels
    ```

## Task 4: Updating your service by removing the line - version: "1.0":

1. Edit existing service by typing:
    
    ```bash
    kubectl edit service service-canary-deployment
    ```
    Service definition should open in an editor. Edit the file by removing the line in selector:
    ```yaml
    version: "1.0"
    ```
    Thanks to that in next Task you will observe how canary deployment works.

## Task 5: Checking the working of canary deployments:
1. Using **External IP** of your service check how many times you will have resposne from pods of old-deployment and canary-deployment:
    
    ```bash
    while true; do curl http://<EXTERNAL IP> && sleep 1 && echo; done
    ```
    You should see responses: 
    - in 80% from pods of old-deployment 
    - in 20% from pods of canary-deployment

## Task 6: Delete everything you created in this lab
1. Delete all you created by typing:
    ```bash
    kubectl delete -f .
    ```
## END LAB

<br><br>

<center><p>&copy; 2019 Chmurowisko Sp. z o.o.<p></center>
