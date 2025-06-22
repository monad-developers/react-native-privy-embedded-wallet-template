import ReceiveSheet from "@/components/sheets/ReceiveSheet";
import SendSheet from "@/components/sheets/SendSheet";
import SignSheet from "@/components/sheets/SignSheet";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";

export default function BottomSheets({
    sheetType,
    setSheetType,
    bottomSheetRef,
  }: {
    sheetType: "send" | "receive" | "sign" | null;
    setSheetType: (type: "send" | "receive" | "sign" | null) => void;
    bottomSheetRef: React.RefObject<BottomSheet | null>;
  }) {
    const snapPoints = ["1%", "90%"];
  
    const handleClose = useCallback(() => {
      setSheetType(null);
      bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          style={{ backgroundColor: "rgba(255, 0, 0, 1)" }}
          {...props}
          disappearsOnIndex={0}
          appearsOnIndex={1}
        />
      ),
      []
    );
  
    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleStyle={{ display: "none" }}
        backgroundStyle={{ backgroundColor: "#fff" }}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        index={0}
        onClose={handleClose}
      >
        {sheetType === "send" && <SendSheet />}
        {sheetType === "receive" && <ReceiveSheet />}
        {sheetType === "sign" && <SignSheet />}
      </BottomSheet>
    );
  }