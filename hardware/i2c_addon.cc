// hello.cc
#include <node.h>
#include <node_buffer.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include "lib/i2c-dev.h"
#include "lib/i2c_lib.h"

using namespace v8;

int address;
int fd;

void Open(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  String::Utf8Value dev(args[0]);
  uint8_t addr = args[1]->NumberValue();
  
  // from i2c_lib.h
  fd = i2c_open(*dev, addr);
  if(fd == -1) {
    isolate->ThrowException(
      Exception::TypeError(String::NewFromUtf8(isolate, "Failed to set address"))
    );
    return;
  }
}

void WriteBlockData(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  Local<Value> buffer = args[1];
  int8_t cmd = args[0]->Int32Value();
  int   len = node::Buffer::Length(buffer->ToObject());
  char* data = node::Buffer::Data(buffer->ToObject());

  Local<Value> err = Null(isolate);

  if (i2c_smbus_write_i2c_block_data(fd, cmd, len, (unsigned char*) data) == -1) {
    err = Exception::TypeError(String::NewFromUtf8(isolate, "Cannot write to device"));
  }

// callback
  if (args[2]->IsFunction()) {
    const unsigned argc = 1;
    Local<Function> callback = Local<Function>::Cast(args[2]);
    Local<Value> argv[argc] = { err };
    callback->Call(Null(isolate), argc, argv);
  }
}

void ReadBlockData(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  int8_t cmd = args[0]->Int32Value();
  int32_t len = args[1]->Int32Value();
  uint8_t data[len]; 
  Local<Value> err = Null(isolate);
  
  Local<Object> buffer = node::Buffer::New(len);

  while (fd > 0) {
    if (i2c_smbus_read_i2c_block_data(fd, cmd, len, data) != len) {
      err = Exception::TypeError(String::NewFromUtf8(isolate, "Error reading length of bytes"));
    }

    memcpy(node::Buffer::Data(buffer), data, len);

    if (args[3]->IsFunction()) {
      const unsigned argc = 2;
      Local<Function> callback = Local<Function>::Cast(args[3]);
      Local<Value> argv[argc] = { err, buffer };
      callback->Call(Null(isolate), argc, argv);
    }
 
    if (args[2]->IsNumber()) {
      int32_t delay = args[2]->Int32Value();
      usleep(delay * 1000);
    } else {
      break;
    }
  }
}

void Close(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  if (fd > 0) {
    close(fd);
  }
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "writeBlockData", WriteBlockData);
  NODE_SET_METHOD(exports, "readBlockData", ReadBlockData);
  NODE_SET_METHOD(exports, "open", Open);
  NODE_SET_METHOD(exports, "close", Close);
}

NODE_MODULE(i2c_addon, init)
