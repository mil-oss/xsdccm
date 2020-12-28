FROM golang:alpine

ENV LANG=C.UTF-8
ENV LANG=C.UTF-8
#compile linux only
ENV GOOS=linux
LABEL name="icxml-xsdccm"
LABEL version="1.0"
ENV GIN_MODE=release
RUN apk add --update gcc libc-dev g++ make wget curl bash libxslt libxml2 libxml2-dev zip
RUN apk --no-cache add openssh curl 

ADD pkg /go/pkg
ADD xsdsrv /go/src/xsdsrv
ADD public /go/src/xsdsrv/public
ADD config /go/src/xsdsrv/config
ADD tmp /go/src/xsdsrv/tmp
WORKDIR /go/src/xsdsrv

#RUN addgroup -g 1000 -S xsduser && \
#    adduser -u 1000 -S xsduser -G xsduser

#RUN chmod 777 /go/src/xsdsrv/public
#RUN chmod 777 /go/src/xsdsrv/tmp
#RUN chown -Rf xsduser:xsduser /go/src/xsdsrv/config
#RUN chown -Rf xsduser:xsduser /go/src/xsdsrv/tmp
#build the binary with debug information removed
RUN go build -ldflags '-w -s' -a -installsuffix cgo -o xsdsrv

RUN go install xsdsrv

#USER xsduser

EXPOSE 8080
ENTRYPOINT ["xsdsrv"]

CMD []