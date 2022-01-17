<img src="../../../img/logo.png" alt="Chmurowisko logo" width="200" align="right">
<br><br>
<br><br>
<br><br>

# ConfigMaps

## LAB Overview
In this lab you will work with ConfigMaps.

ConfigMaps are used to provide configuration information for workloads. This can either be fine-grained information (a short string) or a composite value in the form of a file.

## Task 1: Creating ConfigMap using Manifest File

1. Create a new file by running `nano cm.yaml`.
1. Download [manifest file](./files/cm.yaml) and paste its contents to editor window.
1. Save changes by pressing *CTRL+O* and *CTRL-X*.
1. Create ConfigMap by running:

   ```bash
   kubectl apply -f cm.yaml
   ```

## Task 2: Using ConfigMap as container environment variables
You will create a Pod with two environment variables.

1. Create a new file by running `nano pod.yaml`.
1. Download [manifest file](./files/pod.yaml) and paste its contents to editor window.
1. Save changes by pressing *CTRL+O* and *CTRL-X*.
1. Create a Pod by running:

   ```bash
   kubectl apply -f pod.yaml
   ```

The Pod echoed its env variables.

1. Check the logs of the Pod:
 
   ```bash
   kubectl logs dapi-test-pod
   ```
   
   and you should see two env variables defined in your config maps.

2. Delete the pod:

   ```bash
   kubectl delete pod dapi-test-pod
   ```

## Task 3: Adding ConfigMap data to a Volume

When you create a ConfigMap using *--from-file*, the filename becomes a key stored in the data section of the ConfigMap. The file contents become the key’s value.

You will create a Pod with  config map mounted as file.

1. Create a new file by running 

   ```bash
   nano pod-files.yaml
   ```

1. Download [manifest file](./files/pod-files.yaml) and paste its contents to editor window.
1. Save changes by pressing *CTRL+O* and *CTRL-X*.
1. Create a Pod by running:
 
   ```bash
   kubectl apply -f pod-files.yaml
   ```

   This time, the Pod echoed the list of files inside */etc/config* directory.

1. Check the logs of the Pod:
 
   ```bash
   kubectl logs dapi-test-pod
   ```

   The Pod is still running, so you can exec a few commands inside it

1. Get the list of files inside *map1* directory: 

   ```bash
   kubectl exec dapi-test-pod -- ls /etc/config/map1
   ```

1. Get the content of *workshop.properties* file:
 
   ```bash
   kubectl exec dapi-test-pod -- cat /etc/config/map1/workshop.properties
   ```

1. Get the list of files inside *map2* directory: 

   ```bash
   kubectl exec dapi-test-pod -- ls /etc/config/map2
   ```

1. Get the content of *frontend.properties* file: 

   ```bash
   kubectl exec dapi-test-pod -- cat /etc/config/map2/frontend.properties
   ```

1. Please delete the Pod: 

   ```bash
   kubectl delete pod dapi-test-pod
   ``` 

   and ConfigMaps:

   ```bash
   delete --all configmaps
   ```

## END LAB

<br><br>

<center><p>&copy; 2021 Chmurowisko Sp. z o.o.<p></center>
