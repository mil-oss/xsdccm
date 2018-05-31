FROM golang:alpine
ENV LANG=C.UTF-8
#compile linux only
ENV GOOS=linux
LABEL name="xsdccm"
LABEL version="1.0"
ENV GIN_MODE=release
RUN apk add --update wget gcc g++ make curl bash zip
RUN apk --no-cache add openssh curl 

ADD src /go/src
WORKDIR /go/src/xsdsrv

ADD public /go/src/xsdsrv/public
RUN chmod 777 /go/src/xsdsrv/public

#build the binary with debug information removed
RUN go build -ldflags '-w -s' -a -installsuffix cgo -o xsdsrv
RUN go install xsdsrv

EXPOSE 8080
ENTRYPOINT ["xsdsrv"]

CMD []