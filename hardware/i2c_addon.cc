// hello.cc
#include <node.h>
#include <node_buffer.h>
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

void WriteBlockData(onst FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  Local<Value> buffer = args[1];
  int8_t cmd = args[0]->Int32Value();
  int   len = node::Buffer::Length(buffer->ToObject());
  char* data = node::Buffer::Data(buffer->ToObject());

  Local<Value> err = New<Value>Null(isolate);

  if (i2c_smbus_write_i2c_block_data(fd, cmd, len, (unsigned char*) data) == -1) {
    err = Exception::TypeError(String::NewFromUtf8(isolate, "Cannot write to device"));
  }

// callback
  if (args[2]->IsFunction()) {
    const unsigned argc = 1;
    Local<Function> callback = Local<Function>::Cast(info[2]);
    Local<Value> argv[argc] = { err };
    MakeCallback(isolate, Context::GetCurrent()->Global(), callback, argc, argv);
  }
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "writeBlockData", WriteBlockData);
  NODE_SET_METHOD(exports, "open", Open);
}

NODE_MODULE(i2c_addon, init)
