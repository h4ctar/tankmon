#include "Particle.h"

// #include "jsnsr04t.h"
#include "a02yyuw.h"

// Let Device OS manage the connection to the Particle Cloud
SYSTEM_MODE(AUTOMATIC);

// Show system, cloud connectivity, and application logs over USB
// View logs with CLI using 'particle serial monitor --follow'
SerialLogHandler logHandler(LOG_LEVEL_INFO);

void setup()
{
    Serial1.begin(9600);

    initDistance();
}

void loop()
{
    Serial.println("Reading cellular...");
    CellularSignal signal = Cellular.RSSI();
    float signalStrength = signal.getStrength() / 100;
    float signalQuality = signal.getQuality() / 100;
    Serial.printlnf("Signal strength: %.2f", signalStrength);
    Serial.printlnf("Signal quality: %.2f", signalQuality);

    Serial.println("Reading battery...");
    FuelGauge fuel;
    float batteryCharge = System.batteryCharge() / 100;
    Serial.printlnf("Battery charge: %.2f", batteryCharge);

    float distance = readDistance();

    char data[100];
    sprintf(data, "%.0f,%.2f,%.2f,%.2f", distance, batteryCharge, signalStrength, signalQuality);
    Particle.publish("status", data, PRIVATE);
    Serial.printlnf("Status data: %s", data);

    SystemSleepConfiguration config;
    config.mode(SystemSleepMode::ULTRA_LOW_POWER)
        .duration(30min);
    System.sleep(config);

    // delay(60 * 1000);
}
