Hipnos PM2 Client
====

**Configure PM2**

it will start a web api (launch an health API on port 9615)

    pm2 web 


**Nginx conf**

    upstream name.dev{
      server 127.0.0.1:9615;
    }
       
    server{
        listen 0.0.0.0:80;
        server_name name.dev;
        access_log /var/log/nginx/name_dev.log;
     
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Fpr $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-Nginx-Proxy true;
     
            proxy_pass http://name.dev/;
            proxy_redirect off;
        }
    }

**GULP**
