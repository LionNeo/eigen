import Foundation
import Interstellar

/// Represents the whole auction, all the live biz, timings, watchers

protocol LiveAuctionViewModelType: class {
    var startDate: NSDate { get }
    var lotCount: Int { get }
    var saleAvailabilitySignal: Observable<SaleAvailabilityState> { get }
    var currentLotIDSignal: Observable<String> { get }
    func distanceFromCurrentLot(lot: LiveAuctionLot) -> Int?
}

class LiveAuctionViewModel: NSObject, LiveAuctionViewModelType {

    private var sale: LiveSale
    private var lastUpdatedSaleAvailability: SaleAvailabilityState
    private var lastUpdatedCurrentLotID: String?

    init(sale: LiveSale, currentLotID: String?) {
        self.sale = sale
        self.lastUpdatedSaleAvailability = sale.saleAvailability
        saleAvailabilitySignal.update(lastUpdatedSaleAvailability)
        lastUpdatedCurrentLotID = currentLotID

        if let lastUpdatedCurrentLotID = lastUpdatedCurrentLotID {
            currentLotIDSignal.update(lastUpdatedCurrentLotID)
        }
    }

    var startDate: NSDate {
        return sale.startDate
    }

    var lotCount: Int {
        return sale.saleArtworks.count
    }

    let saleAvailabilitySignal = Observable<SaleAvailabilityState>()
    let currentLotIDSignal = Observable<String>()

    /// A distance relative to the current lot, -x being that it precedded the current
    /// 0 being it is current and a positive number meaning it upcoming.
    func distanceFromCurrentLot(lot: LiveAuctionLot) -> Int? {
        guard let lastUpdatedCurrentLotID = lastUpdatedCurrentLotID else { return nil }

        let lotIDs = sale.saleArtworks.map { $0.liveAuctionLotID }

        let currentIndex = lotIDs.indexOf(lastUpdatedCurrentLotID)
        let lotIndex = lotIDs.indexOf(lot.liveAuctionLotID)
        guard let current = currentIndex, lot = lotIndex else { return nil }

        return (current - lot) * -1
    }
}
