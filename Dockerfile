FROM golang:alpine
ENV LANG=C.UTF-8
#compile linux only
ENV GOOS=linux
ENV GIN_MODE=release
RUN apk add --update wget gcc g++ make curl bash zip
RUN apk --no-cache add openssh curl 

ADD src /go/src
ADD vendor /go/vendor
WORKDIR /go/src/xsdsrv

ADD public /go/src/xsdsrv/public

#build the binary with debug information removed
RUN go build -ldflags '-w -s' -a -installsuffix cgo -o xsdsrv
RUN go install xsdsrv

EXPOSE 8080
ENTRYPOINT ["xsdsrv"]

