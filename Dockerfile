FROM golang:alpine
ENV LANG=C.UTF-8
#compile linux only
ENV GOOS=linux
LABEL name="xsdccm"
LABEL version="1.0"
ENV GIN_MODE=release
RUN apk add --update gcc g++ make wget curl bash libxslt libc-dev libxml2 libxml2-dev zip
RUN apk --no-cache add openssh curl 

ADD pkg /go/pkg
ADD src /go/src
ADD public /go/src/xsdsrv/public
ADD  config /go/src/xsdsrv/config
WORKDIR /go/src/xsdsrv

RUN addgroup -g 1000 -S xsduser && \
    adduser -u 1000 -S xsduser -G xsduser

RUN chmod 777 /go/src/xsdsrv/public
RUN chown -Rf xsduser /go/src/xsdsrv/config
#build the binary with debug information removed
RUN go build -ldflags '-w -s' -a -installsuffix cgo -o xsdsrv
RUN go install xsdsrv

USER xsduser

EXPOSE 8080
ENTRYPOINT ["xsdsrv"]

CMD []