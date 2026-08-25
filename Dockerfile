FROM alpine:latest

# Instalar dependencias esenciales para PocketBase y HTTPS
RUN apk add --no-cache ca-certificates unzip tzdata

# Definir la versión de PocketBase que estás usando
ARG PB_VERSION=0.22.8

# Descargar y descomprimir PocketBase para Linux
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# Directorio de trabajo
WORKDIR /pb

# Exponer el puerto por defecto de PocketBase
EXPOSE 8090

# Iniciar PocketBase apuntando al volumen persistente 'pb_data' en el puerto 8090
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]