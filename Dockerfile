FROM golang:alpine

ENV LANG=C.UTF-8
ENV LANG=C.UTF-8
#compile linux only
ENV GOOS=linux
LABEL name="xsdccm"
LABEL version="1.0"
ENV GIN_MODE=release
RUN apk add --update gcc libc-dev g++ make wget curl bash libxslt libxml2 libxml2-dev zip
RUN apk --no-cache add openssh curl 

ADD xsdsrv /go/src/xsdsrv
WORKDIR /go/src/xsdsrv

RUN go build -ldflags '-w -s' -a -installsuffix cgo -o xsdsrv

RUN go install xsdsrv

EXPOSE 8080
ENTRYPOINT ["xsdsrv"]

CMD []